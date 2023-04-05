const Login = () => {
  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" id="email" name="email" placeholder="Enter your email" />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
