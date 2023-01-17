// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from '/img/sf_logo.png';
import ConnectToPhantom from "../components/ConnectToPhantom";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="">
        {/* <a className="bold" data-active={isActive('/')}>
          SF
        </a> */}
        <a className="bold" data-active={isActive('/')}>
          <Image className="logo"
              src={logo}
              alt="Super Forecaster Logo"
              width={50}
              height={50}
              text-align="center"
            />
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: black;
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: black;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
  

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="">
          <Image className="logo"
              src={logo}
              alt="Super Forecaster Logo"
              width={50}
              height={50}
              text-align="center"
            />
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        <ConnectToPhantom />
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="">
          <Image className="logo"
              src={logo}
              alt="Super Forecaster Logo"
              width={50}
              height={50}
              text-align="center"
          />
        </Link>
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>Collections</a>
        </Link>

        <Link href="/predictions">
          <a data-active={isActive('/predictions')}>All Predictions</a>
        </Link>

        <Link href="/mypredictions">
          <a data-active={isActive('/mypredictions')}>My Predictions</a>
        </Link>

        <style jsx>{`

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: black;
            font-weight: bold;
          }

          .left a[data-active='false'] {
            color: black;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name}
        </p>
        <Link href="/create">
          <button>
            <a>Make Prediction</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <ConnectToPhantom />
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            color: black;
          }

          p {
            display: inline-block;
            font-weight: bold;
            font-size: 16px;
            padding-right: 1rem;
            color: black;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right button {
            background-color: transparent;
          }

          .right a {
            background-color: var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
