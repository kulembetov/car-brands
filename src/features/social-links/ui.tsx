import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function SocialLinks() {
  return (
    <footer className="fixed left-0 top-0 h-full hidden lg:flex flex-col justify-between items-center p-4">
      <div className="flex flex-col justify-center items-center gap-6 flex-grow">
        <ul className="flex flex-col gap-5">
          <li>
            <a href="https://github.com/kulembetov" target="_blank">
              <FaGithub
                size={30}
                className="text-purple-300 hover:scale-125 transition-transform duration-300"
              />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/kulembetov" target="_blank">
              <FaLinkedin
                size={30}
                className="text-purple-300 hover:scale-125 transition-transform duration-300"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/arturkulembetov" target="_blank">
              <FaTwitter
                size={30}
                className="text-purple-300 hover:scale-125 transition-transform duration-300"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
