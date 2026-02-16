import { Button } from "@/components/ui/button";

interface ClientTypeSwitcherProps {
  clientType: 'B2B' | 'B2C';
  onClientTypeChange: (type: 'B2B' | 'B2C') => void;
}

export default function ClientTypeSwitcher({ clientType, onClientTypeChange }: ClientTypeSwitcherProps) {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <Button
        variant={clientType === 'B2B' ? "default" : "ghost"}
        size="sm"
        onClick={() => onClientTypeChange('B2B')}
        className={`px-3 py-1 text-sm font-medium rounded ${
          clientType === 'B2B'
            ? 'bg-primary text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]'
        }`}
      >
        B2B
      </Button>
      <Button
        variant={clientType === 'B2C' ? "default" : "ghost"}
        size="sm"
        onClick={() => onClientTypeChange('B2C')}
        className={`px-3 py-1 text-sm font-medium rounded ${
          clientType === 'B2C'
            ? 'bg-primary text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-[#bd9775] hover:text-[#ffffff] dark:hover:bg-[#bd9775] dark:hover:text-[#ffffff]'
        }`}
      >
        B2C
      </Button>
    </div>
  );
}
