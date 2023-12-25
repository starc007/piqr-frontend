import { Layout, Loader } from "@components";
import OpportunityCard from "@appComp/Opportunity/OpportunityCard";
import { useAppBoundStore } from "@store/mainStore";
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import OpportunityDetail from "@components/app-components/Opportunity/OpportunityDetail";
import Head from "next/head";

const cmnCls =
  "w-full h-9 text-sm font-medium rounded-full transition-all duration-300";

const tabs = [
  {
    name: "All",
    slug: "all",
    id: 1,
  },
  {
    id: 2,
    name: "My Jobs",
    slug: "my-jobs",
  },
  // {
  //   id: 3,
  //   name: "Applied",
  //   slug: "applied",
  // },
  // {
  //   id: 3,
  //   name: "Saved",
  //   slug: "saved",
  // },
];

const Opp = () => {
  const router = useRouter();
  const { type, id } = router.query;
  const [loading, setLoading] = React.useState(false);
  const [singleOppLoading, setSingleOppLoading] = React.useState(false);
  // const initialLoad = React.useRef(true);

  // const {
  //   getAllOpportunities,
  //   allOppurtunities,
  //   getOpportunityById,
  //   selectedOpportunity,
  //   getMyOpportunities,
  //   myOpportunities,
  //   isLoggedIn,
  // } = useAppBoundStore((state) => ({
  //   getAllOpportunities: state.getAllOpportunities,
  //   allOppurtunities: state.allOppurtunities,
  //   getOpportunityById: state.getOpportunityById,
  //   selectedOpportunity: state.selectedOpportunity,
  //   getMyOpportunities: state.getMyOpportunities,
  //   myOpportunities: state.myOpportunities,
  //   isLoggedIn: state.isLoggedIn,
  // }));

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (allOppurtunities.length === 0 && type === "all") {
  //       setLoading(true);
  //       getAllOpportunities().then(() => setLoading(false));
  //     }

  //     if (myOpportunities.length === 0 && type === "my-jobs" && isLoggedIn) {
  //       getMyOpportunities().then(() => {
  //         setLoading(false);
  //       });
  //     }

  //     if (!type) {
  //       router.push({
  //         pathname: "/jobs",
  //         query: { type: "all" },
  //       });
  //     }
  //   }
  // }, [
  //   type,
  //   allOppurtunities.length,
  //   myOpportunities.length,
  //   router,
  //   isLoggedIn,
  //   getAllOpportunities,
  //   getMyOpportunities,
  // ]);

  // useEffect(() => {
  //   if (id) {
  //     setSingleOppLoading(true);
  //     getOpportunityById(id as string).then(() => setSingleOppLoading(false));
  //   }
  // }, [id, getOpportunityById]);

  // const renderComponent = useCallback(() => {
  //   switch (type) {
  //     case "all":
  //       return (
  //         <>
  //           {loading && (
  //             <div className="flex justify-center mt-20">
  //               <Loader col="text-dark" />
  //             </div>
  //           )}
  //           <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
  //             {!loading &&
  //               allOppurtunities.length > 0 &&
  //               allOppurtunities.map((opp) => (
  //                 <OpportunityCard key={opp._id} item={opp} />
  //               ))}
  //           </div>
  //           {!loading && allOppurtunities.length === 0 && (
  //             <div className="flex justify-center mt-20">
  //               <p className="text-dark font-medium">Nothing here for now</p>
  //             </div>
  //           )}
  //         </>
  //       );
  //     case "my-jobs":
  //       if (!isLoggedIn) {
  //         return (
  //           <div className="flex justify-center mt-20">
  //             <p className="text-dark font-medium">Login to view your jobs</p>
  //           </div>
  //         );
  //       }

  //       return (
  //         <>
  //           {loading && (
  //             <div className="flex justify-center mt-20">
  //               <Loader col="text-dark" />
  //             </div>
  //           )}
  //           <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
  //             {!loading &&
  //               myOpportunities.length > 0 &&
  //               myOpportunities.map((opp) => (
  //                 <OpportunityCard key={opp._id} item={opp} isMine />
  //               ))}
  //           </div>
  //           {!loading && myOpportunities.length === 0 && (
  //             <div className="flex justify-center mt-20">
  //               <p className="text-dark font-medium">
  //                 You haven&apos;t posted any Opportunity
  //               </p>
  //             </div>
  //           )}
  //         </>
  //       );
  //     case "open":
  //       return (
  //         <>
  //           {singleOppLoading && (
  //             <div className="flex justify-center mt-20">
  //               <Loader col="text-dark" />
  //             </div>
  //           )}
  //           {!singleOppLoading && selectedOpportunity && (
  //             <OpportunityDetail item={selectedOpportunity} />
  //           )}
  //         </>
  //       );
  //     default:
  //       return (
  //         <>
  //           {loading && (
  //             <div className="flex justify-center mt-20">
  //               <Loader col="text-dark" />
  //             </div>
  //           )}
  //           <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
  //             {!loading &&
  //               allOppurtunities.length > 0 &&
  //               allOppurtunities.map((opp) => (
  //                 <OpportunityCard key={opp._id} item={opp} />
  //               ))}
  //           </div>
  //           {!loading && allOppurtunities.length === 0 && (
  //             <div className="flex justify-center mt-20">
  //               <p className="text-dark font-medium">Nothing here for now</p>
  //             </div>
  //           )}
  //         </>
  //       );
  //   }
  // }, [
  //   type,
  //   allOppurtunities,
  //   loading,
  //   singleOppLoading,
  //   selectedOpportunity,
  //   myOpportunities,
  //   isLoggedIn,
  // ]);

  return (
    <Layout>
      <Head>
        <title>Commission Free Opportunities | Piqr</title>
        <meta
          name="description"
          content="Find commission free opportunities on Piqr. Get access to opportunities based on your skills and interests."
        />
        <meta
          name="keywords"
          content="jobs, gigs, opportunities, free, commission free,"
        />
        <meta name="author" content="Piqr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="px-4 h-screen flex flex-col justify-center items-center">
        <p className="text-center text-2xl">
          Work in progress, we are making it better for you
        </p>
        <p className="mt-4 text-gray-500">Be patient, Good things ahead </p>
        {/* <div className="flex justify-between w-full">
          <div className="flex md:w-1/4 w-2/3 bg-primary/10 rounded-full p-1">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    router.push({
                      pathname: "/jobs",
                      query: { type: tab.slug },
                    });
                  }}
                  className={`${
                    type === tab.slug ? "bg-primary text-white" : "text-primary"
                  }
                    ${cmnCls}`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-5">{renderComponent()}</div> */}
      </div>
    </Layout>
  );
};

export default Opp;
