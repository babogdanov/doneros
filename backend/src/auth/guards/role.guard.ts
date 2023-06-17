import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { User, UserRole } from '@entities/user.entity'

type DonerosJwt = User & {
  iat: number
  exp: number
}

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Verifies if a request has the appropriate roles by decoding the JWT attached to the request headers object.
   * Note: As this guard needs roles to be instantiated, you'll need to use a new instance of it with a list of roles
   * each of which is allowed to access the guarded resource, as opposed to a reference to the class.
   */
  constructor(private readonly allowedRoles: UserRole[]) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const { authorization } = context.switchToHttp().getRequest().headers

      const bearerToken = (authorization as string).slice(
        authorization.indexOf(' ') + 1,
      )
      // Assuming the user object contains the user roles
      // You can modify this line to match your user data structure
      const decodedToken = verify(
        bearerToken,
        process.env.JWT_SECRET!,
      ) as DonerosJwt

      if (decodedToken && decodedToken.role) {
        return this.matchRoles(decodedToken.role)
      }
    } catch (e) {
      throw new UnauthorizedException(e)
    }

    return false
  }

  private matchRoles(userRole: UserRole): boolean {
    return this.allowedRoles.includes(userRole)
  }
}
