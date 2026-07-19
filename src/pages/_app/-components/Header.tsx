import { EditIcon } from '@/assets/icons/EditIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { BellIcon } from '@/assets/icons/BellIcon'
import { Avatar } from "@/components/ui/Avatar"

import codeBobJrAvatar from "@/assets/images/mocks/code-bob-jr.jpg"

export function Header() {
  const srcMock = codeBobJrAvatar
  // const srcMock = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"

  return (
    <div className="sticky inset-x-0 top-0 flex justify-end items-center w-full h-17.5 py-4 px-6 z-1000">
      <div className="flex gap-4">
        <button type="button" className="gap-2 p-1 bg-black-50 rounded-xs header-item focus-ring">
          <div className="icon-box">
            <EditIcon width={20} height={20} />
          </div>

          <p className="font-inter font-light text-md">Novo Post</p>
        </button>

        <button type="button" className="gap-2 p-1 bg-black-50 rounded-xs header-item focus-ring">
          <div className="icon-box">
            <SearchIcon width={20} height={20} />
          </div>
        </button>

        <button type="button" className="relative gap-2 p-1 bg-black-50 rounded-xs header-item focus-ring">
          <div className="icon-box">
            <div className="dot" />
            <BellIcon width={21} height={21} />
          </div>
        </button>

        <button type="button" className="group p-0.5 ml-1 bg-black-50 rounded-full header-item focus-ring">
          <Avatar
            src={srcMock}
            letter="CB"
          />
        </button>
      </div>
    </div>
  )
}
