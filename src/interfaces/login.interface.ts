import { z } from 'zod'
import { loginschema } from './../schemas/login.schema'

export type Loginschema = z.infer<typeof loginschema>