import { BookUserIcon } from "lucide-react";
import Title from "./Title";

const Testimonials = () => {
  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <svg
              className="mt-0.5 fill-purple-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <path d="M4.555.72c-.1.08-.2.16-.3.24-.18.12-.38.2-.59.24-.13.03-.25.04-.38.04-.48.04-.72.06-.92.13-.46.16-.83.53-.99.99-.07.2-.09.44-.13.92-.01.19-.02.29-.04.38-.04.21-.12.41-.25.59-.05.08-.11.15-.24.3-.31.37-.47.55-.56.74-.21.44-.21.96 0 1.4.09.19.25.38.56.74.13.15.19.22.24.3.12.18.2.38.24.59.02.09.03.19.04.38.04.48.06.72.13.92.16.46.53.83.99.99.2.07.44.09.92.13.19.01.29.02.38.04.21.04.41.12.59.25.08.05.15.11.3.24.37.31.55.47.74.56.44.21.96.21 1.4 0 .19-.09.38-.25.74-.56.15-.13.22-.19.3-.24.18-.12.38-.2.59-.24.09-.02.19-.03.38-.04.48-.04.72-.06.92-.13.46-.16.83-.53.99-.99.07-.2.09-.44.13-.92.01-.19.02-.29.04-.38.04-.21.12-.41.25-.59.05-.08.11-.15.24-.3.31-.37.47-.55.56-.74.21-.44.21-.96 0-1.4-.09-.19-.25-.38-.56-.74-.13-.15-.19-.22-.24-.3-.12-.18-.2-.38-.24-.59-.02-.09-.03-.19-.04-.38-.04-.48-.06-.72-.13-.92-.16-.46-.53-.83-.99-.99-.2-.07-.44-.09-.92-.13-.19-.01-.29-.02-.38-.04-.21-.04-.41-.12-.59-.25-.08-.05-.15-.11-.3-.24-.37-.31-.55-.47-.74-.56-.44-.21-.96-.21-1.4 0-.19.09-.38.25-.74.56z" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">
        This resume builder helped me create a professional resume quickly and easily.
      </p>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .marquee-inner {
            animation: marqueeScroll 25s linear infinite;
          }

          .marquee-reverse {
            animation-direction: reverse;
          }
        `}
      </style>

      <div id="testimonials" className="flex flex-col items-center my-10 scroll-mt-12">
        <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-400/10 rounded-full px-6 py-1.5">
          <BookUserIcon className="size-4.5 stroke-gray-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="Don't just take our words"
          description="Hear what our users say about us and how our resume builder helped them succeed."
        />
      </div>

      <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white to-transparent"></div>

        <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-linear-to-l from-white to-transparent"></div>
      </div>

      <div className="w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-linear-to-l from-white to-transparent"></div>
      </div>
    </>
  );
};

export default Testimonials;