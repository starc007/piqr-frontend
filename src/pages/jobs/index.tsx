import { Layout, Loader } from "@components";
import JobCard from "@appComp/Opportunity/JobCard";
import { useAppBoundStore } from "@store/mainStore";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const cmnCls =
  "w-full h-9 text-sm font-medium rounded-full transition-all duration-300";

const tabs = [
  {
    name: "Full Time",
    slug: "full-time",
    id: 1,
  },
  {
    id: 2,
    name: "Internship",
    slug: "internship",
  },
  {
    id: 3,
    name: "Freelance",
    slug: "freelance",
  },
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
  const [page, setPage] = React.useState(0);
  const initialLoad = React.useRef(true);

  const { allJobs, getJobs, isLoggedIn } = useAppBoundStore((state) => ({
    allJobs: state.allJobs,
    getJobs: state.getJobs,
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      setLoading(true);
      const tp = tabs.find((tab) => tab.slug === type);
      getJobs(tp?.id || 1, page).then(() => setLoading(false));
    }
  }, []);

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
        <title>Jobs | Piqr</title>
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
      <div className="h-screen flex flex-col border-r">
        <div className="flex justify-between w-full mt-3 px-3">
          <div className="flex md:w-1/3 w-2/3 bg-primary/10 rounded-full p-1">
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
          {/* Might need to add */}
        </div>
        <div className="mt-4 px-4">
          {loading && (
            <div className="flex justify-center mt-20">
              <Loader col="text-dark" />
            </div>
          )}

          {!loading && allJobs.length > 0 && (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
              {allJobs.map((opp) => (
                <JobCard key={opp._id} item={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Opp;
