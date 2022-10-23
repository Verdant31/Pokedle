import { useRouter } from "next/router";

interface ICardSelectionProps {
  title: string
  subtitle: string
  onClick: () => void
}

const CardSelection: React.FunctionComponent<ICardSelectionProps> = ({onClick, title, subtitle}) => {
  return (
    <div role="button" onClick={onClick} className="bg-yellow-500 h-20 flex flex-col  justify-center pl-6 pr-8 rounded-md cursor-pointer hover:scale-105 duration-300">
      <p className="text-lg font-bold ">{title}</p>
      <p className="text-lg font-medium ">{subtitle}</p>
    </div>
  )
};

export default CardSelection;
