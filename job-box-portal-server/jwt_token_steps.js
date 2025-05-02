/* 
**
*1. after successfull login: generate a jwt token
*npm i jsonwebtoken, cookie-parser
*jwt.sign(payload, secret, {expiresIn: '1d'})
*
*2. send token (generate in the server side) to the client side
*localstorage --> easier
*httpOnly Cookies -->better bt not secure 


*3. for sensitive or secure or  private or protected apis: send to the server side
*
*
*on the server side
*app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true

  *in the clint 
  *use axios get, post, delete, patch for secure apis and must use: { withCredentials: true}

4. validate the token in the server side 
if valid : provide data
if not valid: logOut

5.check right user accessing his/her on data base on permission
*/