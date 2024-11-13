
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex justify-center  bg-slate-200 shadow-2xl mb-3 p-3 rounded-lg m-3 font-semibold text-sm gap-2">
      Created By ❤️
      <a
        target="_blank"
        title="Vicky Girase"
        className="text-black"
      >
        Vicky Girase
      </a>
      <h1>©️</h1>
        {year}
        <strong>
          Food<span>Fire</span>
        </strong>
    </div>
  );
};

export default Footer;
