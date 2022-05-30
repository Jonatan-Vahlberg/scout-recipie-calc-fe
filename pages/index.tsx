import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import ListView from "../components/List/ListView";

const HomePage: NextPage<{}> = () => {

  return (
    <div>
      <Head>
        <meta name="description" content="Recept kalkylator för scout evenemang" />
      </Head>
      <ListView/>
    </div>
  );
};

export default HomePage;
