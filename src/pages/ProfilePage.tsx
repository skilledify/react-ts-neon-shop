import { useState, type FormEvent } from 'react';
import { PageHeader } from '../components/PageHeader';
import { UserIcon } from '../components/icons';
import { useShop } from '../store/ShopContext';

const avatars = ['😎', '👾', '🦊', '🌙', '🤖', '🔥', '💎', '🎮'];

const inputClass =
    'h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60 focus:bg-white/[0.07]';
const labelClass =
    'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500';

export function ProfilePage() {
    const { profile, updateProfile, notify } = useShop();
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [avatar, setAvatar] = useState(profile.avatar);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (name.trim().length < 2) {
            notify('Имя должно быть хотя бы из двух символов');
            return;
        }

        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            notify('Введите корректный e-mail');
            return;
        }

        updateProfile({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            avatar,
        });
        notify('Профиль сохранён');
    };

    return (
        <>
            <PageHeader
                eyebrow="Личный кабинет"
                icon={<UserIcon className="h-4 w-4" />}
                title={
                    <>
                        Профиль{' '}
                        <span className="text-gradient">игрока</span>
                    </>
                }
                description="Имя подставится в форму заказа, а аватар будет вас встречать в меню и на странице поддержки."
            />

            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <form
                    onSubmit={handleSubmit}
                    className="animate-fade-up rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                >
                    <div className="flex items-center gap-4">
                        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-3xl ring-1 ring-white/10">
                            {avatar}
                        </span>
                        <div>
                            <h2 className="font-display text-lg font-bold text-white">
                                {profile.name || 'Незнакомец'}
                            </h2>
                            <p className="text-xs text-zinc-500">
                                {profile.email || 'E-mail не указан'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className={labelClass}>Аватар</p>
                        <div className="flex flex-wrap gap-2">
                            {avatars.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setAvatar(option)}
                                    aria-label={`Выбрать аватар ${option}`}
                                    aria-pressed={avatar === option}
                                    className={`grid h-10 w-10 place-items-center rounded-xl border text-lg transition ${
                                        avatar === option
                                            ? 'border-fuchsia-400/60 bg-fuchsia-500/15 shadow-lg shadow-fuchsia-500/20'
                                            : 'border-white/10 bg-white/[0.04] hover:border-white/25'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4">
                        <label className="block">
                            <span className={labelClass}>Имя</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Геймер"
                                className={inputClass}
                            />
                        </label>

                        <label className="block">
                            <span className={labelClass}>E-mail</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                className={inputClass}
                            />
                        </label>

                        <label className="block">
                            <span className={labelClass}>Телефон</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                placeholder="+7 999 000-00-00"
                                className={inputClass}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-[0.98]"
                    >
                        Сохранить профиль
                    </button>

                    <p className="mt-3 text-center text-[11px] text-zinc-600">
                        Данные хранятся только локально — в этом демо нет
                        сервера.
                    </p>
                </form>
            </div>
        </>
    );
}
