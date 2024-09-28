import TransactionForm from "@/components/forms/TransactionForm";
import Loader from "@/components/Loader";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";

const TransactionPage = () => {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) {
    return <Loader />;
  }

  if (!data.authUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full max-w-7xl mx-auto py-3">
      <TransactionForm formType="Update"></TransactionForm>
    </div>
  );
};

export default TransactionPage;
