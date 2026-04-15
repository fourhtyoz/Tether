import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    validate(payload: any) {
        // TODO: db look ups to enhance the response
        console.log('payload', payload)
        return { id: payload.sub, email: payload.email }
    }
}