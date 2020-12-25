import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateInvoice = async () => {
    setIsLoading(true);

    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/generate-invoice', {
        method: 'POST',
        body: name,
      });
      return data.arrayBuffer();
    };

    const saveAsPDF = async () => {
      const buffer = fetchData();
      const blob = new Blob([buffer]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'somedoc.pdf';
      link.click();
      setIsLoading(false);
      alert('Invoice downloaded');
    };

    saveAsPDF();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello {name || 'Customer'} 👋</h1>

        <p className={styles.description}>
          Fill the form below to generate your invoice
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label for='name'>Enter Name</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button
            onClick={() => generateInvoice()}
            disabled={isLoading}
            className={styles.button}>
            Download Invoice
          </button>
        </form>
        {isLoading && <p>Generating Invoice... 🤞🏽</p>}
      </main>
    </div>
  );
}
