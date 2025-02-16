import ChartCard from "@/components/ChartCard";
import { TextCard } from "@/components/TextCard";
import TransactionHistory from "@/components/TransactionHistory";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useQuery } from "@apollo/client";
import HeroSection from "../components/HeroSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import TransactionForm from "@/components/forms/TransactionForm";
import SpinnerSvg from "@/components/SpinnerSvg";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full px-5">
        <SpinnerSvg></SpinnerSvg>
      </div>
    );
  }

  if (error) {
    return <ErrorBoundary></ErrorBoundary>;
  }

  return (
    <div className="h-full space-y-10 px-5 py-5 md:py-10 max-w-7xl mx-auto">
      {data?.authUser ? (
        <>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-5">
            <div className="w-full space-y-5">
              <TextCard></TextCard>
              <ChartCard createdAt={data.authUser.createdAt}></ChartCard>
            </div>
            <div className="w-full h-full">
              <TransactionForm formType="Create"></TransactionForm>
            </div>
          </div>

          <TransactionHistory></TransactionHistory>
        </>
      ) : (
        <HeroSection></HeroSection>
      )}
    </div>
  );
};

export default HomePage;
