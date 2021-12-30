import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Recipie from "../components/Recipie/Recipie";
import apiKit from "../utils/ApiKit";
import { useRecipie } from "../utils/context/RecipieContext";

const DetailPage: NextPage = () => {
  const router = useRouter();
  const recipieContext = useRecipie();
  useEffect(() => {
    console.log(router);
    if (router.query.id) {
      const id = Number(router.query.id.toString());
      apiKit
        .getRecipie(id)
        .then((response) => {
          recipieContext.setRecipie(response.data);
        })
        .catch((error) => {
          console.warn(`ERROR: GETTING RECIPIE ${error}`);
        });
    }
  }, [router.query.id]);

  return (
    <div>
      <Recipie />
    </div>
  );
};

export default DetailPage;
