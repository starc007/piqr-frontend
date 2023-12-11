import { ChevronDownSVG, FilterSVG } from "@assets/index";
import { CustomButton, Select } from "@components";
import { Disclosure, Popover } from "@headlessui/react";
import { useAppBoundStore } from "@store/mainStore";
import { AVAILABLE_FOR, CATEGORY, LOCATIONS } from "@utils";
import { useRouter } from "next/router";
import { useState } from "react";

const availableFor = AVAILABLE_FOR.map((item) => ({
  label: item,
  value: item,
}));
const Category = CATEGORY.map((item) => ({
  label: item,
  value: item,
}));

const FilterOptions = () => {
  const {
    getUsersByCategory,
    setUsersLoading,
    usersLoading,
    setFilteredUsers,
    allUsers,
  } = useAppBoundStore((state) => ({
    setFilteredUsers: state.setFilteredUsers,
    getUsersByCategory: state.getUsersByCategory,
    setUsersLoading: state.setUsersLoading,
    usersLoading: state.usersLoading,
    allUsers: state.allUsers,
  }));

  const [filterData, setFilterData] = useState({
    availableFor: "",
    category: "",
    location: "",
  });
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const { availableFor, category, location } = filterData;
    const obj: any = {
      offering: availableFor,
      category,
      city: location,
      page: 0,
    };
    Object.keys(obj).forEach((key) => obj[key] === "" && delete obj[key]);

    router.push(
      {
        pathname: "/explore",
        query: obj,
      } as any,
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const clearFilters = async () => {
    setFilterData({ availableFor: "", category: "", location: "" });
    setFilteredUsers(allUsers);
    setIsFilterApplied(false);
    router.push(
      {
        pathname: "/explore",
        query: {
          type: "all",
        },
      } as any,
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const filterTagStyle =
    "hidden text-xs text-primary bg-primary/10 sm:flex items-center rounded-full px-3 h-8 font-semibold";
  return (filterData?.availableFor ||
    filterData?.category ||
    filterData?.location) &&
    isFilterApplied ? (
    <div className="flex gap-2 items-center">
      {filterData?.availableFor && (
        <p className={filterTagStyle}>{filterData.availableFor}</p>
      )}
      {filterData?.category && (
        <p className={filterTagStyle}>{filterData.category}</p>
      )}
      {filterData?.location && (
        <p className={filterTagStyle}>{filterData.location}</p>
      )}
      <button
        onClick={clearFilters}
        disabled={usersLoading}
        className="text-xs bg-gray-50 px-3 h-8 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-all duration-200"
      >
        Clear filter
      </button>
    </div>
  ) : (
    <Popover className="relative">
      <Popover.Button
        className={
          "text-primary bg-primary/10 flex gap-1 items-center rounded-full px-3 py-2 text-sm font-semibold focus:outline-none"
        }
      >
        <FilterSVG />
        <span className="ml-2">Filters</span>
      </Popover.Button>
      <Popover.Panel className="absolute mt-2 duration-200 z-10 w-64 right-0 bg-white border rounded-lg shadow-xl overflow-hidden">
        <Disclosure>
          <Disclosure.Button
            className={
              "w-full p-3 flex items-center text-sm font-medium justify-between text-gray-600  hover:bg-gray-50"
            }
          >
            <span>City</span>
            <ChevronDownSVG />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="p-2">
              <Select
                options={LOCATIONS.map((item) => ({
                  label: item,
                  value: item,
                }))}
                placeholder="Select location"
                isCreatable
                onChange={(e: { label: string; value: string }) => {
                  setFilterData({ ...filterData, location: e.value });
                }}
              />
            </div>
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button
            className={
              "border-t w-full p-3 flex items-center text-sm font-medium justify-between text-gray-600  hover:bg-gray-50"
            }
          >
            <span>Category</span>
            <ChevronDownSVG />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="p-2">
              <Select
                options={Category}
                placeholder="Select Category"
                isCreatable
                onChange={(e: { label: string; value: string }) => {
                  setFilterData({ ...filterData, category: e.value });
                }}
              />
            </div>
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button
            className={
              "border-t w-full p-3 flex items-center text-sm font-medium justify-between text-gray-600  hover:bg-gray-50"
            }
          >
            <span>Offering</span>
            <ChevronDownSVG />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="p-2">
              <Select
                options={availableFor}
                placeholder="Select Offering"
                isCreatable
                onChange={(e: { label: string; value: string }) => {
                  setFilterData({ ...filterData, availableFor: e.value });
                }}
              />
            </div>
          </Disclosure.Panel>
        </Disclosure>
        <div className="p-2 border-t">
          <CustomButton
            onClick={handleSubmit}
            disabled={usersLoading}
            isLoading={usersLoading}
            variant="primaryNoOutline"
            cls="text-sm w-full rounded-full px-2 h-10 "
          >
            Apply
          </CustomButton>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default FilterOptions;
