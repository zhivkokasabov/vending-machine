import { ResponsiveContainer } from "components/atoms/ResponsiveContainer";

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <ResponsiveContainer>
        <div className="text-2xl font-bold text-gray-800">
          Vending Machine
        </div>
      </ResponsiveContainer>
    </header>
  );
};
