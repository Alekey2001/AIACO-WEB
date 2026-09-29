import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Search,
  Shield,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const demoUsers = [
  {
    id: 1,
    name: 'Administrador AIACO',
    email: 'admin@aiaco.demo',
    role: 'super_admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Administrador Contable',
    email: 'contabilidad@aiaco.demo',
    role: 'admin_contable',
    status: 'active',
  },
  {
    id: 3,
    name: 'Trabajador AIACO',
    email: 'trabajador@aiaco.demo',
    role: 'trabajador',
    status: 'active',
  },
  {
    id: 4,
    name: 'Usuario AIACO',
    email: 'usuario@aiaco.demo',
    role: 'cliente',
    status: 'active',
  },
  {
    id: 5,
    name: 'Usuario Demo 02',
    email: 'usuario02@aiaco.demo',
    role: 'cliente',
    status: 'inactive',
  },
]

function getRoleLabel(role) {
  switch (role) {
    case 'super_admin':
      return 'Super Admin'

    case 'admin_contable':
      return 'Admin Contable'

    case 'trabajador':
      return 'Trabajador'

    default:
      return 'Usuario'
  }
}

function getRoleColor(role) {
  switch (role) {
    case 'super_admin':
      return '#ecb2ff'

    case 'admin_contable':
      return '#00eefc'

    case 'trabajador':
      return '#d4a5ff'

    default:
      return '#9ca3af'
  }
}

export default function UsersManager() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [users, setUsers] = useState(demoUsers)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'trabajador',
  })

  const filteredUsers = useMemo(() => {
    return users.filter(currentUser => {
      const searchValue = search.toLowerCase().trim()

      const matchesSearch =
        currentUser.name
          .toLowerCase()
          .includes(searchValue) ||
        currentUser.email
          .toLowerCase()
          .includes(searchValue)

      const matchesRole =
        roleFilter === 'all' ||
        currentUser.role === roleFilter

      const matchesStatus =
        statusFilter === 'all' ||
        currentUser.status === statusFilter

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      )
    })
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ])

  const handleRoleChange = (id, role) => {
    setUsers(currentUsers =>
      currentUsers.map(currentUser =>
        currentUser.id === id
          ? {
              ...currentUser,
              role,
            }
          : currentUser
      )
    )
  }

  const handleStatusChange = id => {
    setUsers(currentUsers =>
      currentUsers.map(currentUser =>
        currentUser.id === id
          ? {
              ...currentUser,
              status:
                currentUser.status === 'active'
                  ? 'inactive'
                  : 'active',
            }
          : currentUser
      )
    )
  }

  const handleCreateUser = event => {
    event.preventDefault()

    if (
      !newUser.name.trim() ||
      !newUser.email.trim()
    ) {
      return
    }

    const createdUser = {
      id: Date.now(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: 'active',
    }

    setUsers(currentUsers => [
      ...currentUsers,
      createdUser,
    ])

    setNewUser({
      name: '',
      email: '',
      role: 'trabajador',
    })

    setIsCreateOpen(false)
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-6 py-10"
      style={{
        background:
          'radial-gradient(circle at 50% 15%, #0b1a30 0%, #050b15 42%, #02050a 100%)',
        color: '#ffffff',
      }}
    >
      {/* Glow superior */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: '-25%',
          right: '-10%',
          borderRadius: '50%',
          background: '#bd00ff',
          filter: 'blur(210px)',
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/panel')}
            className="flex items-center gap-2 transition-all duration-300"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.48)',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.7}
            />

            Volver al panel
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-300"
            style={{
              background: 'rgba(189,0,255,0.10)',
              border: '1px solid rgba(189,0,255,0.28)',
              color: '#ecb2ff',
              cursor: 'pointer',
            }}
          >
            <UserPlus
              size={17}
              strokeWidth={1.7}
            />

            Crear usuario
          </button>
        </div>

        {/* Title */}
        <section className="mt-14">
          <div
            className="inline-flex items-center gap-2"
            style={{
              color: '#ecb2ff',
            }}
          >
            <Shield
              size={18}
              strokeWidth={1.7}
            />

            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              AIACO // SUPER ADMIN
            </span>
          </div>

          <h1
            className="mt-5"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize:
                'clamp(38px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
            }}
          >
            Gestión de usuarios
          </h1>

          <p
            className="mt-4 max-w-2xl"
            style={{
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.7,
              fontSize: 14,
            }}
          >
            Administra usuarios, roles y estados
            dentro del ecosistema AIACO.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {[
            {
              label: 'Usuarios',
              value: users.length,
            },
            {
              label: 'Activos',
              value: users.filter(
                item => item.status === 'active'
              ).length,
            },
            {
              label: 'Trabajadores',
              value: users.filter(
                item =>
                  item.role === 'trabajador'
              ).length,
            },
            {
              label: 'Administradores',
              value: users.filter(
                item =>
                  item.role === 'super_admin' ||
                  item.role === 'admin_contable'
              ).length,
            },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-2xl p-5"
              style={{
                background:
                  'rgba(255,255,255,0.022)',
                border:
                  '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p
                style={{
                  fontFamily:
                    "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color:
                    'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </p>

              <p
                className="mt-2"
                style={{
                  fontFamily:
                    "'Sora', sans-serif",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* Filtros */}
        <section
          className="mt-7 rounded-3xl p-5"
          style={{
            background:
              'rgba(255,255,255,0.018)',
            border:
              '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_220px] gap-4">

            {/* Search */}
            <div
              className="flex items-center gap-3 rounded-xl px-4"
              style={{
                background:
                  'rgba(255,255,255,0.025)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Search
                size={17}
                strokeWidth={1.7}
                style={{
                  color:
                    'rgba(255,255,255,0.30)',
                }}
              />

              <input
                value={search}
                onChange={event =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Buscar por nombre o correo..."
                className="w-full py-3 outline-none"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: 13,
                }}
              />
            </div>

            {/* Role */}
            <select
              value={roleFilter}
              onChange={event =>
                setRoleFilter(
                  event.target.value
                )
              }
              className="rounded-xl px-4 py-3 outline-none"
              style={{
                background: '#080d18',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                color:
                  'rgba(255,255,255,0.70)',
                cursor: 'pointer',
              }}
            >
              <option value="all">
                Todos los roles
              </option>

              <option value="super_admin">
                Super Admin
              </option>

              <option value="admin_contable">
                Admin Contable
              </option>

              <option value="trabajador">
                Trabajador
              </option>

              <option value="cliente">
                Usuario
              </option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={event =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl px-4 py-3 outline-none"
              style={{
                background: '#080d18',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                color:
                  'rgba(255,255,255,0.70)',
                cursor: 'pointer',
              }}
            >
              <option value="all">
                Todos los estados
              </option>

              <option value="active">
                Activo
              </option>

              <option value="inactive">
                Inactivo
              </option>
            </select>

          </div>
        </section>

        {/* Tabla */}
        <section
          className="mt-6 overflow-hidden rounded-3xl"
          style={{
            background:
              'rgba(255,255,255,0.018)',
            border:
              '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">
              <thead>
                <tr
                  style={{
                    borderBottom:
                      '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {[
                    'Usuario',
                    'Rol',
                    'Estado',
                    'Cambiar rol',
                    'Acción',
                  ].map(header => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left"
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                        fontSize: 9,
                        letterSpacing:
                          '0.14em',
                        color:
                          'rgba(255,255,255,0.30)',
                        textTransform:
                          'uppercase',
                        fontWeight: 500,
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(currentUser => {
                  const roleColor =
                    getRoleColor(
                      currentUser.role
                    )

                  return (
                    <tr
                      key={currentUser.id}
                      style={{
                        borderBottom:
                          '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {/* User */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                              background:
                                'rgba(255,255,255,0.035)',
                              border:
                                '1px solid rgba(255,255,255,0.08)',
                              fontFamily:
                                "'Sora', sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            {currentUser.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p
                              style={{
                                color:
                                  'rgba(255,255,255,0.82)',
                                fontSize: 13,
                              }}
                            >
                              {currentUser.name}
                            </p>

                            <p
                              className="mt-1"
                              style={{
                                color:
                                  'rgba(255,255,255,0.30)',
                                fontSize: 11,
                              }}
                            >
                              {currentUser.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <span
                          className="inline-flex rounded-full px-3 py-1.5"
                          style={{
                            background:
                              `${roleColor}10`,
                            border:
                              `1px solid ${roleColor}25`,
                            color:
                              roleColor,
                            fontFamily:
                              "'JetBrains Mono', monospace",
                            fontSize: 9,
                            textTransform:
                              'uppercase',
                          }}
                        >
                          {getRoleLabel(
                            currentUser.role
                          )}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">

                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background:
                                currentUser.status ===
                                'active'
                                  ? '#00eefc'
                                  : '#ff7474',

                              boxShadow:
                                currentUser.status ===
                                'active'
                                  ? '0 0 8px rgba(0,238,252,0.65)'
                                  : '0 0 8px rgba(255,116,116,0.40)',
                            }}
                          />

                          <span
                            style={{
                              fontSize: 11,
                              color:
                                currentUser.status ===
                                'active'
                                  ? '#00eefc'
                                  : '#ff8c8c',
                            }}
                          >
                            {currentUser.status ===
                            'active'
                              ? 'Activo'
                              : 'Inactivo'}
                          </span>

                        </div>
                      </td>

                      {/* Change Role */}
                      <td className="px-6 py-5">
                        <select
                          value={currentUser.role}
                          onChange={event =>
                            handleRoleChange(
                              currentUser.id,
                              event.target.value
                            )
                          }
                          disabled={
                            currentUser.id === 1
                          }
                          className="rounded-lg px-3 py-2 outline-none"
                          style={{
                            background:
                              '#080d18',
                            border:
                              '1px solid rgba(255,255,255,0.08)',
                            color:
                              'rgba(255,255,255,0.68)',
                            cursor:
                              currentUser.id === 1
                                ? 'not-allowed'
                                : 'pointer',
                            opacity:
                              currentUser.id === 1
                                ? 0.45
                                : 1,
                          }}
                        >
                          <option value="super_admin">
                            Super Admin
                          </option>

                          <option value="admin_contable">
                            Admin Contable
                          </option>

                          <option value="trabajador">
                            Trabajador
                          </option>

                          <option value="cliente">
                            Usuario
                          </option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              currentUser.id
                            )
                          }
                          disabled={
                            currentUser.id === 1
                          }
                          className="rounded-lg px-3 py-2"
                          style={{
                            background:
                              'rgba(255,255,255,0.025)',
                            border:
                              '1px solid rgba(255,255,255,0.08)',
                            color:
                              'rgba(255,255,255,0.60)',
                            cursor:
                              currentUser.id === 1
                                ? 'not-allowed'
                                : 'pointer',
                            opacity:
                              currentUser.id === 1
                                ? 0.4
                                : 1,
                            fontSize: 11,
                          }}
                        >
                          {currentUser.status ===
                          'active'
                            ? 'Desactivar'
                            : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-16 text-center">

                <Users
                  size={30}
                  strokeWidth={1.4}
                  style={{
                    margin: '0 auto',
                    color:
                      'rgba(255,255,255,0.18)',
                  }}
                />

                <p
                  className="mt-4"
                  style={{
                    color:
                      'rgba(255,255,255,0.32)',
                    fontSize: 13,
                  }}
                >
                  No se encontraron usuarios.
                </p>

              </div>
            )}

          </div>
        </section>

        {/* Usuario actual */}
        <p
          className="mt-5"
          style={{
            color:
              'rgba(255,255,255,0.20)',
            fontSize: 10,
          }}
        >
          Sesión administrativa: {user.email}
        </p>

      </div>

      {/* MODAL CREAR USUARIO */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{
            background:
              'rgba(0,0,0,0.72)',
            backdropFilter:
              'blur(14px)',
          }}
        >
          <div
            className="relative w-full max-w-md rounded-3xl p-7"
            style={{
              background: '#070d17',
              border:
                '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 40px 100px rgba(0,0,0,0.60)',
            }}
          >
            <button
              onClick={() =>
                setIsCreateOpen(false)
              }
              className="absolute right-5 top-5"
              style={{
                background:
                  'transparent',
                border: 'none',
                color:
                  'rgba(255,255,255,0.45)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <p
              style={{
                fontFamily:
                  "'JetBrains Mono', monospace",
                color: '#ecb2ff',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              AIACO // NEW USER
            </p>

            <h2
              className="mt-3"
              style={{
                fontFamily:
                  "'Sora', sans-serif",
                fontSize: 26,
                fontWeight: 650,
              }}
            >
              Crear usuario
            </h2>

            <p
              className="mt-2"
              style={{
                color:
                  'rgba(255,255,255,0.35)',
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              Esta acción es simulada durante
              el desarrollo frontend.
            </p>

            <form
              onSubmit={handleCreateUser}
              className="mt-7"
            >
              <label
                style={{
                  fontSize: 11,
                  color:
                    'rgba(255,255,255,0.45)',
                }}
              >
                Nombre
              </label>

              <input
                value={newUser.name}
                onChange={event =>
                  setNewUser(current => ({
                    ...current,
                    name:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                placeholder="Nombre completo"
                style={{
                  background:
                    'rgba(255,255,255,0.03)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  color: '#ffffff',
                }}
              />

              <label
                className="block mt-5"
                style={{
                  fontSize: 11,
                  color:
                    'rgba(255,255,255,0.45)',
                }}
              >
                Correo
              </label>

              <input
                type="email"
                value={newUser.email}
                onChange={event =>
                  setNewUser(current => ({
                    ...current,
                    email:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                placeholder="usuario@aiaco.com"
                style={{
                  background:
                    'rgba(255,255,255,0.03)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  color: '#ffffff',
                }}
              />

              <label
                className="block mt-5"
                style={{
                  fontSize: 11,
                  color:
                    'rgba(255,255,255,0.45)',
                }}
              >
                Rol
              </label>

              <select
                value={newUser.role}
                onChange={event =>
                  setNewUser(current => ({
                    ...current,
                    role:
                      event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                style={{
                  background:
                    '#080d18',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  color:
                    'rgba(255,255,255,0.75)',
                }}
              >
                <option value="admin_contable">
                  Admin Contable
                </option>

                <option value="trabajador">
                  Trabajador
                </option>

                <option value="cliente">
                  Usuario
                </option>
              </select>

              <button
                type="submit"
                className="mt-7 w-full rounded-xl py-3"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(189,0,255,0.85), rgba(0,238,252,0.75))',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Crear usuario demo
              </button>
            </form>

          </div>
        </div>
      )}
    </main>
  )
}