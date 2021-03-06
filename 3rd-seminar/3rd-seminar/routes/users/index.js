const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let usersDB = require('../../modules/users');

router.post('/signup', (req, res) => {
    const { email, password, userName } = req.body; // 1. req.body에서 데이터 가져오기
    
    if (!email || !password || !userName) { //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
        console.log("필요한 값이 없습니다!");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    
    try {
        //3. 존재하는 아이디인지 확인하기. 이미 존재하는 아이디면 ALREADY ID 반환
        const alreadyEmail = await User.findOne({
            where: {
                email: email,
            }
        });

        if (alreadyEmail) { 
            console.log('이미 존재하는 이메일 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
        }

        //4. salt 생성
        const salt = crypto.randomBytes(64).toString('base64');
        //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) 해싱 => 암호화된 password 만들기
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

        //6. User email, 암호화된 password, salt, userName 디비에 생성!
        const User = await User.create({
            email: email,
            password: hashedPassword,
            userName: userName,
            salt: salt,
        });

        console.log(user);
        //7. status: 200 message: SING_UP_SUCCESS, data: id, email, userName 반환! (비밀번호, salt 반환 금지!!)
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, { id: user.id, email, userName }));
    } catch (error) {
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body; // 1. req.body에서 데이터 가져오기
    
    if (!email || !password) { //2. request data 확인하기, email, password data가 없다면 NullValue 반환
        console.log("필요한 값이 없습니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
        //3. 존재하는 아이디인지 확인하기. 이미 존재하는 아이디면 ALREADY ID 반환
        const alreadyEmail = await User.findOne({
            where: {
                email: email,
            },
        });

        console.log(alreadyEmail);

        if (!alreadyEmail) { 
            console.log('없는 이메일 입니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        
        //4. 비밀번호 확인하기 - 로그인할 id의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와 암호화를 한후 디비에 저장되어있는 password와 일치하면 true
        //                      일치하지 않으면 Miss Match password 반환
        const { id, userName, salt, password: hashedPassword } = alreadyEmail;
        const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
        
        if (inputPassword != hashedPassword) {
            console.log("비밀번호가 일치하지 않습니다.");
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
        }

        //5. status: 200, message: SIGN_IN_SUCCESS, data: id, email, userName 반환
        return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, id));
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
    }
});

router.get('/', (req, res) => {
    // 1.모든 유저정보 조회 (id, password, salt)!
    const users = usersDB;
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, users));
});

module.exports = router;