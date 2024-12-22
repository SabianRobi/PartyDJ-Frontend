type ErrorPageProps = {
  status: number;
  message: string;
};

// TODO: Format this page to look better
const ErrorPage = ({ status, message }: ErrorPageProps) => (
  <>
    <div>Something unexpected happened :(</div>
    <div>Status: {status}</div>
    <div>Message: {message}</div>
  </>
);

export default ErrorPage;
