// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Prediction</h1>
          {/* <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Collection"
            type="text"
            value={title}
          /> */}
          <select onChange={(e) => setTitle(e.target.value)}>
            <option value="" disabled selected>Select Collection</option>
            <option value="degods">DeGods</option>
            <option value="okay_bears">Okay Bears</option>
            <option value="y00ts">Y00ts</option>
            <option value="degenerate_ape_academy">Degenerate Ape Academy</option>
            <option value="solana_monkey_business">Solana Monkey Business</option>
            <option value="t00bs">Y00ts mint t00bs</option>
            <option value="abc_abracadabra">ABC</option>
            <option value="claynosaurz">Claynosaurz</option>
            <option value="trippin_ape_tribe">Trippin Ape Tribe</option>
            <option value="cets_on_creck">Cets On Creck</option>
            <option value="blocksmith_labs">Smyths</option>
            <option value="galactic_geckos">GGSG Galactic Geckos</option>
            <option value="shadowy_super_coder_dao">Shadowy Super Coder DAO</option>
            <option value="primates">Primates</option>
            <option value="famous_fox_federation">Famous Fox Federation</option>
            <option value="aurory">Aurory</option>
            <option value="lily">LILY</option>
            <option value="portals">Portals</option>
            <option value="communi3">Communi3 Mad Scientists</option>
            <option value="beep_boop_battery">Beep Boop Battery</option>
            <option value="the_catalina_whale_mixer">The Catalina Whale Mixer</option>
          </select>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Make a prediction, enter direction (up, down) and time interval (1 day, 7 days, 30 days"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
