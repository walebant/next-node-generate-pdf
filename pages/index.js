import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [name, setName] = useState('Customer');

  return (
    <div className={styles.container}>
      <Head>
        <title>Generate Customer Invoice</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello {name} 👋</h1>

        <p className={styles.description}>
          Fill the form below to generate your invoice
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor='name'>Enter Name</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button className={styles.button}>Download Invoice</button>
        </form>
      </main>
    </div>
  );
}
