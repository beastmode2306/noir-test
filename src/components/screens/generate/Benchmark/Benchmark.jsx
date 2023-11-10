const Benchmark = ({
  status,
  elapsedTime,
  data,
  error = undefined,
  verificationStatus,
}) => {
  return (
    <article
      style={{
        margin: "20px",
      }}
    >
      <h1> Benchmark </h1>
      <p>Status: {status}</p>
      <p>Elapsed time: {elapsedTime}</p>
      {!error ? (
        <p>Data: {JSON.stringify(data)}</p>
      ) : (
        <p>Error: {error.message}</p>
      )}
      <p>Verification status: {verificationStatus}</p>
    </article>
  );
};

export default Benchmark;
