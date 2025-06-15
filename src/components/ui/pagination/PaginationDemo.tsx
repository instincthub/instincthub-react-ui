"use client";
import React, { useState } from "react";
import { PaginationData } from "@/types";
import Pagination from "./Pagination";
import { API_HOST_URL } from "../../lib";

// Demo Component
const PaginationDemo: React.FC = () => {
  const [data, setData] = useState<PaginationData>({
    count: 150,
    next: "http://127.0.0.1:8000/api/v1/posts/?limit=20&offset=20",
    previous: null,
    results: [],
  });
  const [searchValues, setSearchValues] = useState("");
  const [tabsValues, setTabsValues] = useState("");

  // Mock URL params (in real app, this would come from useSearchParams)
  const [urlOffset, setUrlOffset] = useState("0");

  const handleSearch = (value: string) => {
    setSearchValues(value);
    setUrlOffset("0"); // Reset to first page on search
  };

  const handleTabChange = (value: string) => {
    setTabsValues(value);
    setUrlOffset("0"); // Reset to first page on tab change
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--Nunito, sans-serif)" }}>
      <h2 style={{ marginBottom: "2rem", color: "var(--DarkCyan)" }}>
        Enhanced Pagination with API Integration
      </h2>

      {/* Demo Controls */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label>Search: </label>
          <input
            type="text"
            value={searchValues}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts..."
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label>Category: </label>
          <select
            value={tabsValues}
            onChange={(e) => handleTabChange(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">All Categories</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      {/* Current State Info */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3>Current State:</h3>
        <p>Offset: {urlOffset}</p>
        <p>Search: "{searchValues}"</p>
        <p>Tab: "{tabsValues}"</p>
        <p>Total items: {data.count}</p>
      </div>

      {/* Pagination Component */}
      <Pagination
        offset={urlOffset}
        data={data}
        limit={20}
        urlPath={API_HOST_URL + "posts/"}
        setData={setData}
        token="mock-token"
        searchValues={searchValues}
        tabsValues={tabsValues}
        rangeLimit={5}
        showFirstLast={true}
      />
    </div>
  );
};

export default PaginationDemo;
