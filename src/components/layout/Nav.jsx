import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import AuthContext from '../../api/context/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  HomeModernIcon,
  Cog6ToothIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { IconHome, IconUserCircle } from '@tabler/icons-react';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const avatarUrl = user?.profile?.avatar?.url;

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="bg-white w-full top-0 z-50 sticky">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5" onClick={closeMenus}>
            <span className="sr-only">Holidaze</span>
            <span className="text-2xl font-regular text-gray-900">Holidaze</span>
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-normal leading-6 flex items-center gap-x-2 ${isActive ? 'text-indigo-600' : 'text-gray-900'}`
            }
            onClick={closeMenus}
          >
            <IconHome className="h-6 w-6" aria-hidden="true" />
            Home
          </NavLink>
          <NavLink
            to="/venues"
            className={({ isActive }) =>
              `text-sm font-normal leading-6 flex items-center gap-x-2 ${isActive ? 'text-indigo-600' : 'text-gray-900'}`
            }
            onClick={closeMenus}
          >
            <HomeModernIcon className="h-6 w-6" aria-hidden="true" />
            Venues
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden lg:flex lg:flex-col lg:items-center lg:text-sm lg:font-normal lg:leading-6 ${isActive ? 'text-indigo-600' : 'text-gray-900'}`
                }
                onClick={closeMenus}
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hidden lg:flex lg:flex-col lg:items-center lg:text-sm lg:font-normal lg:leading-6 ${isActive ? 'text-indigo-600' : 'text-gray-900'}`
                }
                onClick={closeMenus}
              >
                <UserPlusIcon className="h-6 w-6" aria-hidden="true" />
                Sign up
              </NavLink>
            </>
          ) : (
            <div className="relative hidden lg:block">
              <button
                type="button"
                className="flex items-center gap-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-normal text-gray-900"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-md" />
                ) : (
                  <IconUserCircle className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <UserIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      Profile
                    </NavLink>
                    {user.profile?.venueManager && (
                      <>
                        <NavLink
                          to="/venue/add"
                          className={({ isActive }) =>
                            `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                              isActive ? 'text-indigo-600' : 'text-gray-900'
                            } hover:bg-gray-50`
                          }
                          onClick={closeMenus}
                        >
                          <PlusIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                          Add Venue
                        </NavLink>
                        <NavLink
                          to="/profile/venues"
                          className={({ isActive }) =>
                            `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                              isActive ? 'text-indigo-600' : 'text-gray-900'
                            } hover:bg-gray-50`
                          }
                          onClick={closeMenus}
                        >
                          <BuildingOffice2Icon className="h-6 w-6 ml-2" aria-hidden="true" />
                          My Venues
                        </NavLink>
                      </>
                    )}
                    <NavLink
                      to="/bookings"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <CalendarIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      My Bookings
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <Cog6ToothIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      Settings
                    </NavLink>
                    <button
                      className="-mx-3 block w-full text-left rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <ArrowRightOnRectangleIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      Log out
                    </button>
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5" onClick={closeMenus}>
              <span className="sr-only">Holidaze</span>
              <span className="text-2xl font-regular text-gray-900">Holidaze</span>
            </NavLink>
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                      isActive ? 'text-indigo-600' : 'text-gray-900'
                    } hover:bg-gray-50`
                  }
                  onClick={closeMenus}
                >
                  <IconHome className="h-6 w-6" aria-hidden="true" />
                  Home
                </NavLink>
                <NavLink
                  to="/venues"
                  className={({ isActive }) =>
                    `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                      isActive ? 'text-indigo-600' : 'text-gray-900'
                    } hover:bg-gray-50`
                  }
                  onClick={closeMenus}
                >
                  <HomeModernIcon className="h-6 w-6" aria-hidden="true" />
                  Venues
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                      Profile
                    </NavLink>
                    {user.profile?.venueManager && (
                      <>
                        <NavLink
                          to="/venue/add"
                          className={({ isActive }) =>
                            `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                              isActive ? 'text-indigo-600' : 'text-gray-900'
                            } hover:bg-gray-50`
                          }
                          onClick={closeMenus}
                        >
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                          Add venue
                        </NavLink>
                        <NavLink
                          to="/profile/venues"
                          className={({ isActive }) =>
                            `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                              isActive ? 'text-indigo-600' : 'text-gray-900'
                            } hover:bg-gray-50`
                          }
                          onClick={closeMenus}
                        >
                          <BuildingOffice2Icon className="h-6 w-6" aria-hidden="true" />
                          My Venues
                        </NavLink>
                      </>
                    )}
                    <NavLink
                      to="/bookings"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <CalendarIcon className="h-6 w-6" aria-hidden="true" />
                      My Bookings
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                      Settings
                    </NavLink>
                  </>
                )}
              </div>
              <div className="py-6">
                {!user && (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      Log in
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `-mx-3 rounded-lg px-3 py-2 text-base font-normal leading-7 flex items-center gap-x-2 ${
                          isActive ? 'text-indigo-600' : 'text-gray-900'
                        } hover:bg-gray-50`
                      }
                      onClick={closeMenus}
                    >
                      <UserPlusIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                      Sign up
                    </NavLink>
                  </>
                )}
                {user && (
                  <button
                    className="-mx-3 w-full text-left rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-x-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
