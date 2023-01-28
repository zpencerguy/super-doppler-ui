import React, { ReactNode } from "react";
import Header from "./Header";
import Image from 'next/image';
import bg from '/img/sf_montage_bg.png';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
        background-image: url(${bg.src});
        background-color: transparent;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: transparent;
        background-color: transparent;
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }

      .py-2 {
        padding-top: 0.5rem; /* 8px */
        padding-bottom: 0.5rem; /* 8px */
      }

      .px-4 {
        padding-left: 1rem; /* 16px */
        padding-right: 1rem; /* 16px */
      }

      .border {
        border-width: 1px;
      }
      
      .rounded-md {
        border-radius: 0.375rem; /* 6px */
      }

      .text-sm {
        font-size: 0.875rem; /* 14px */
        line-height: 1.25rem; /* 20px */
      }

      .border-purple-700 {
        border-color: rgb(126 34 206);
      }

      .font-medium {
        font-weight: 500;
      }
      
      .text-purple-700 {
          color: rgb(126 34 206);
      }
      
      .whitespace-nowrap {
          white-space: nowrap;
      }
      
      .connected:hover {
        background-color: rgba(126, 34, 206, 0.75);
      }

      .bg-purple-500 {
        background-color: rgb(126 34 206);
      }
      
      .border-transparent {
          border-color: transparent;
      }
      
      .text-white {
          color: rgb(255 255 255);
      }

      .disconnected:hover {
        background-color: rgba(126, 34, 206, 0.75);
      }

      .submitButton:hover {
        background-color: rgba(156, 163, 175, 0.75) !important;
        cursor: pointer !important;
      }


    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
        background: transparent;
        background-color: transparent;
      }
    `}</style>
  </div>
);

export default Layout;
