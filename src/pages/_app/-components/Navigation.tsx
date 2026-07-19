import { HamburgerIcon } from "@/assets/icons/HamburgerIcon"
import { Wordmark } from "@/assets/svgs/Wordmark"
import { Link } from "@tanstack/react-router"
import { twMerge } from "tailwind-merge"

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const menuButtonBaseClass =
    "header-item focus-ring rounded-xs p-1.5 transition-all ease-in-out"

  const openButtonClass = twMerge(
    menuButtonBaseClass,
    isMenuOpen
      ? "-translate-x-3 opacity-0 duration-300 pointer-events-none"
      : "translate-x-0 opacity-100 duration-350 pointer-events-auto",
  )

  const closeButtonClass = twMerge(
    menuButtonBaseClass,
    isMenuOpen
      ? "opacity-100 transition-opacity duration-800"
      : "opacity-0 pointer-events-none transition-opacity duration-150",
  )

  return (
    <>
      <div
        className={twMerge(
          "fixed top-4 left-6 z-1001 flex w-full items-center justify-between transition-[max-width] ease-in-out",
          isMenuOpen ? "max-w-68" : "max-w-46.5",
        )}
        aria-label="Navegação principal"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={openButtonClass}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <HamburgerIcon width={20} height={20} />
          </button>

          <Link
            to="/feed"
            className={twMerge(
              "flex h-[38px] items-center pt-1 transition-transform ease-in-out",
              isMenuOpen ? "-translate-x-10 duration-350" : "translate-x-0 duration-300",
            )}
          >
            <Wordmark width={110} height={33} />
          </Link>
        </div>

        <button
          type="button"
          className={closeButtonClass}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <HamburgerIcon width={20} height={20} />
        </button>
      </div>

      <aside
        className={twMerge(
          "relative shrink-0 overflow-hidden transition-[width] duration-350 ease-in-out",
          isMenuOpen ? "w-78" : "w-0",
        )}
      >
        <nav
          className={twMerge(
            "fixed top-0 left-0 z-1000 h-screen w-78 px-2.5 pt-17.5 pb-4 border-r border-slate-30 bg-black-40 transition-transform duration-350 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
          )}
          aria-label="Navegação principal"
        >
          <ul className="flex flex-col gap-3">
          </ul>
        </nav>
      </aside>
    </>
  )
}
