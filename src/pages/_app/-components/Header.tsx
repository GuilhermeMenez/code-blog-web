import { EditIcon } from '@/assets/icons/EditIcons'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { BellIcon } from '@/assets/icons/BellIcon'

interface HeaderProps {
  isMenuOpen: boolean
}

export function Header({ isMenuOpen }: HeaderProps) {
  return (
    <div className="sticky inset-x-0 top-0 flex justify-end items-center w-full h-17.5 py-4 px-4.5 z-1000">
      <div className="flex gap-3.5">
        <button className="gap-2 p-1 bg-black-50 rounded-sm header-item focus-ring">
          <div className="icon-box">
            <EditIcon width={20} height={20} />
          </div>

          <p className="font-inter font-light text-md">Novo Post</p>
        </button>

        <button className="gap-2 p-1 bg-black-50 rounded-sm header-item focus-ring">
          <div className="icon-box">
            <SearchIcon width={20} height={20} />
          </div>
        </button>

        <button className="relative gap-2 p-1 bg-black-50 rounded-sm header-item focus-ring">
          <div className="icon-box">
            <div className="dot" />
            <BellIcon width={21} height={21} />
          </div>
        </button>
      </div>
    </div>
  )
}
