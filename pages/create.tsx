// pages/create.tsx

import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Router from 'next/router';
import prisma from '../lib/prisma';


const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [collection_slug, setCollectionSlug] = useState('');
  const [start_price, setStartPrice] = useState(9.29);
  const [end_price, setEndPrice] = useState(10);
  const [threshold, setThreshold] = useState(0.1)
  const [direction, setDirection] = useState('');
  const [duration, setDuration] = useState('');


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // const floor = await prisma.$queryRaw`select price from floorPrices fp inner join collections c on fp.collection_id = c.collection_id where c.slug = ${collection_slug} order by date desc limit 1`
      // console.log(floor)

      const body = { collection_slug, direction, duration, threshold};
      // console.log(JSON.stringify(body))
      await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/mypredictions');
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
          <select onChange={(e) => setCollectionSlug(e.target.value)}>
            <option value="" disabled selected>Select Collection</option>
            <option value="aurory">Aurory</option>
            <option value="degenerate_trash_pandas">Degenerate Trash Pandas</option>
            <option value="degenerate_ape_academy">Degenerate Ape Academy</option>
            <option value="solgods">Gods</option>
            <option value="taiyopilots">Taiyo Pilots</option>
            <option value="danger_valley_ducks">Danger Valley Ducks</option>
            <option value="famous_fox_federation">Famous Fox Federation</option>
            <option value="bad_creature_society">Bad Creature Society</option>
            <option value="claynosaurz">Claynosaurz</option>
            <option value="lily">LILY</option>
            <option value="elixir_ovols">Elixir: Ovols</option>
            <option value="cets_on_creck">CECKS ON CRECK</option>
            <option value="dandies">Dandies</option>
            <option value="abc_abracadabra">ABC</option>
            <option value="immortals_nft">Immortals</option>
            <option value="duelbots">DUELBOTS</option>
          </select>
          <select onChange={(e) => setDirection(e.target.value)}>
            <option value="" disabled selected>Select Direction</option>
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
          <select onChange={(e) => setDuration(e.target.value)}>
            <option value="" disabled selected>Select Duration</option>
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="30">30 days</option>
          </select>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Prediction notes (optional)"
            rows={8}
            value={content}
          />
          <input  type="submit" value="Create" className="submitButton rounded-md py-2 px-4 text-sm font-medium" />
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
