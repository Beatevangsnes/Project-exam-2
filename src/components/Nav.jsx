import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, HomeModernIcon, Cog6ToothIcon, CalendarIcon, UserIcon, PlusIcon, BuildingOffice2Icon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { IconHome, IconUserCircle } from '@tabler/icons-react';
import { useUser } from '../context/UserContext';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const avatarUrl = user?.avatar?.url;

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="bg-white w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5" onClick={closeMenus}>
            <span className="sr-only">Holidaze</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-2" onClick={closeMenus}>
            <IconHome className='h-6 w-6' aria-hidden="true" />
            Home
          </Link>
          <Link to="/venues" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-2" onClick={closeMenus}>
            <HomeModernIcon className='h-6 w-6' aria-hidden="true" />
            Venues
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!user ? (
            <>
              <Link to="/login" className="hidden lg:flex lg:flex-col lg:items-center lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900" onClick={closeMenus}>
                <ArrowLeftOnRectangleIcon className='h-6 w-6' aria-hidden="true" />
                Log in
              </Link>
              <Link
                to="/register"
                className="hidden lg:flex lg:flex-col lg:items-center lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                onClick={closeMenus}
              >
                <UserPlusIcon className='h-6 w-6' aria-hidden="true" />
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative hidden lg:block">
              <button
                type="button"
                className="flex items-center gap-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <IconUserCircle className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link to="/profile" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <UserIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Profile
                    </Link>
                    {user.venueManager && (
                      <>
                        <Link to="/venues/new" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                          <PlusIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                          New Listing
                        </Link>
                        <Link to="/venues" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                          <BuildingOffice2Icon className='h-6 w-6 ml-2' aria-hidden="true" />
                          Your Venues
                        </Link>
                      </>
                    )}
                    <Link to="/bookings" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <CalendarIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Your Bookings
                    </Link>
                    <Link to="/settings" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <Cog6ToothIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <ArrowRightOnRectangleIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={closeMenus}>
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                  <IconHome className='h-6 w-6' aria-hidden="true" />
                  Home
                </Link>
                <Link to="/venues" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                  <HomeModernIcon className='h-6 w-6' aria-hidden="true" />
                  Venues
                </Link>
                {user && (
                  <>
                    <Link to="/profile" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <UserIcon className='h-6 w-6' aria-hidden="true" />
                      Profile
                    </Link>
                    {user.venueManager && (
                      <>
                        <Link to="/venues/new" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                          <PlusIcon className='h-6 w-6' aria-hidden="true" />
                          Add venue
                        </Link>
                        <Link to="/venues" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                          <BuildingOffice2Icon className='h-6 w-6' aria-hidden="true" />
                          Your Venues
                        </Link>
                      </>
                    )}
                    <Link to="/bookings" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <CalendarIcon className='h-6 w-6' aria-hidden="true" />
                      Your Bookings
                    </Link>
                    <Link to="/settings" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <Cog6ToothIcon className='h-6 w-6' aria-hidden="true" />
                      Settings
                    </Link>
                  </>
                )}
              </div>
              <div className="py-6">
                {!user && (
                  <>
                    <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <ArrowLeftOnRectangleIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Log in
                    </Link>
                    <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2" onClick={closeMenus}>
                      <UserPlusIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                      Sign up
                    </Link>
                  </>
                )}
                {user && (
                  <Link
                    to="/logout"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <ArrowRightOnRectangleIcon className='h-6 w-6 ml-2' aria-hidden="true" />
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
