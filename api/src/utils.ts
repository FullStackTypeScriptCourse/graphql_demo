import jwt from 'jsonwebtoken';
import {User} from './models/allmodels';
import {IMeasureUnit} from './types';

const userFromToken = async (token:string) => {
    if (!token) {
        return null;
    }
    try {
        // jwt.verify will throw an error if the token is invalid or expired.
        let decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as { userId: string };
        const user = await User.findById(decoded.userId, ['-password','-__v']); // exclude 'password' and '__v' from the user object (__v is a mongo version tracker prop).
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

// authenticate takes a resolver function and returns a new resolver function after running some checks.
const authenticate = (role: string, resolve: any) => {
    return async (parent: any, args: any, context: any, info: any) => {
        if (!context.user || !context.user.roles.includes(role)) {
            throw new Error('Not authenticated');
        }
        console.log('AUTHENTICATE', context.user, context.user.roles);
        return await resolve(parent, args, context, info);
    };
};

// Always compare the answer and correctAnswer as floats rounded to how many DECIMAL PLACES are on the correct answer.
const isCorrectAnswer = (answer: number, correctAnswer: number, answerMeasureUnitId: string, serverMeasureUnitId: string) => {
    const numberOfDecimals = correctAnswer.toString().split('.')[1]?.length || 0;
    const multipleOfTen = Math.pow(10, numberOfDecimals);
    answer = Math.round(answer * multipleOfTen) / multipleOfTen;
    console.log('isCorrectAnswer', answer, correctAnswer, answerMeasureUnitId, serverMeasureUnitId);
    // answer = parseFloat(answer.toFixed(numberOfDecimals));
    return answer === correctAnswer && serverMeasureUnitId === answerMeasureUnitId;
};

export { userFromToken, authenticate, isCorrectAnswer};
// export default userFromToken;