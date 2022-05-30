import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Recipie from "../components/Recipie/Recipie";
import apiKit from "../utils/ApiKit";
import { useRecipie } from "../utils/context/RecipieContext";

const DetailPage: NextPage = () => {
  const router = useRouter();
  const recipie = useRecipie();
  useEffect(() => {
    
    if (router.query.id) {
      const id = Number(router.query.id.toString());
      recipie.getRecipie(id);
    }
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Scoutrecpt kalkylator</title>
      </Head>
      <Recipie />
    </>
  );
};

export default DetailPage;
