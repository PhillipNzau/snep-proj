import { LazyLoadImage } from "react-lazy-load-image-component";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-purple-900 w-full h-60 text-zinc-300">
      <div className="flex flex-col gap-12">
        <LazyLoadImage
          src="/footer-logo.png"
          alt="footer-logo"
          width={197}
          height={74}
        />

        <p className="font-metrophobic">
          All rights reserved © SNEP | Organisation
        </p>
      </div>
    </footer>
  );
};

export default Footer;
