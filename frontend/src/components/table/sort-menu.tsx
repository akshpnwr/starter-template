import { ArrowUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const sortOptions = [
  {
    label: 'Date [New to Old]',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  {
    label: 'Date [Old to New]',
    sortBy: 'createdAt',
    sortOrder: 'asc',
  },
  { label: 'Budget [High to Low]', sortBy: 'approxBudget', sortOrder: 'desc' },
  { label: 'Budget [Low to High]', sortBy: 'approxBudget', sortOrder: 'asc' },
] as const;

export type SortOption = {
  sortBy: (typeof sortOptions)[number]['sortBy'];
  sortOrder: 'asc' | 'desc';
};

interface SortMenuProps {
  selectedSort: SortOption;
  setSelectedSort: (value: SortOption) => void;
}

export default function SortMenu({
  selectedSort,
  setSelectedSort,
}: SortMenuProps) {
  const selectedOption = sortOptions.find(
    (option) =>
      option.sortBy === selectedSort.sortBy &&
      option.sortOrder === selectedSort.sortOrder,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="">
          <span className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={`${option.sortBy}-${option.sortOrder}`}
            onClick={() => setSelectedSort(option)}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>{option.label}</span>
            {selectedOption?.sortBy === option.sortBy &&
              selectedOption?.sortOrder === option.sortOrder && (
                <Check className="h-4 w-4" />
              )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
