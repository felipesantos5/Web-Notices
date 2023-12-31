import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SkeletonCard } from "../loading/skeletonCard";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { fetchNewsData } from "../../services/newsApi";
import { Article } from "../../types/types";

const Card = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNewsData();
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 3 }}>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
          : news.map((article, index) => (
              <div key={index} className="flex justify-center px-6 py-14 max-h-650 max-w-5xl m-auto overflow-hidden md:flex-col-reverse md:max-w-full md:max-h-full md:pb-8 dark:text-slate-100">
                <div>
                  <img src={article.image} alt="" className="w-500 max-h-96 rounded-xl pointer-events-none md:w-full" />
                </div>
                <div className="w-2/4 max-h-96 max-w-4xl pl-6 md:max-w-full md:w-full md:mb-4 md:max-h-full md:pl-0">
                  <a className="text-darkBrown font-semibold dark:text-slate-100" href={article.url} target="_blank">
                    {article.source.name}
                  </a>
                  <h2 className="text-4xl font-bold text-brown dark:text-darkCream">{article.title}</h2>
                  <h3 className="mt-4 md:max-h-full text-justify">{article.description.slice(0, 120)}</h3>
                  <div className="flex gap-1 mt-1">
                    <p className="">{article.publishedAt.slice(0, 10).replace(/-/g, "/")}</p>
                    <p>-</p>
                    <p className="">{article.publishedAt.slice(11, 16)}</p>
                  </div>
                </div>
              </div>
            ))}
      </motion.div>
      <Footer />
    </>
  );
};

export default Card;
