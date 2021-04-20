import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_REQ } from "../redux/types";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: GET_REQ,
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {posts &&
          posts.map((item) => {
            return <h1 key={item}>{item}</h1>;
          })}
      </main>
    </div>
  );
}
