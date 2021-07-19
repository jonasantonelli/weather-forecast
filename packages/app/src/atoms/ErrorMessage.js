function ErrorMessage({ error, ...rest }) {
  return (
    <div role="alert" {...rest}>
      <span>There was an error: </span>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorMessage
