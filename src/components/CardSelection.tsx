interface ICardSelectionProps {
  title: string
  subtitle: string
  onClick: () => void
}

const CardSelection: React.FunctionComponent<ICardSelectionProps> = ({onClick, title, subtitle}) => {
  return (
    <div role="button" onClick={onClick} className="text-left bg-yellow-500 h-16 md:h-24 flex flex-col  justify-center pl-6 pr-8 rounded-md cursor-pointer hover:scale-105 duration-300">
      <p className="text-base font-bold md:text-xl ">{title}</p>
      <p className="text-sm font-medium md:text-lg ">{subtitle}</p>
    </div>
  )
};

export default CardSelection;
