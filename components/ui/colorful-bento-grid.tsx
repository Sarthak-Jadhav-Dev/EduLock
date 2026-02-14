
import { Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ColorfulBentoGrid() {
    return (
        <section
            id="free-tools"
            className="bg-white rounded-3xl p-4 my-16 max-w-6xl mx-auto font-sans"
        >
            <div className="flex flex-col md:flex-row items-end justify-between w-full">
                <div className="flex flex-col my-12 w-full items-start justify-start gap-4">
                    <div className="flex flex-col md:flex-row gap-2 items-end w-full justify-between ">
                        <h2 className="relative text-4xl md:text-5xl font-display font-semibold max-w-xl text-left leading-[1em] text-base-content">
                            Enterprise-Grade Security, <br />{" "}
                            <span>
                                <Gift
                                    className="inline-flex text-accent-bento fill-accent-light rotate-12"
                                    size={40}
                                    strokeWidth={2}
                                />
                            </span>{" "}
                            Built for Education.
                        </h2>
                        <p className="max-w-sm font-semibold text-md text-neutral-bento/50">
                            AES-256 encryption, role-based access, device binding, and dynamic watermarking — all in one platform.
                        </p>
                    </div>

                    <div className="flex flex-row text-accent-bento gap-6 items-start justify-center">
                        <p className="text-base whitespace-nowrap font-medium">
                            AES-256 Encrypted
                        </p>
                        <p className="text-base whitespace-nowrap font-medium">
                            Role-Based Access Control
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:items-start md:justify-start gap-4 ">
                {/* Card 1: UX + Product-Led */}
                <Link
                    href={"#"}
                    className="md:col-span-2 overflow-hidden hover:scale-[1.01] hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out h-[330px] relative bg-accent-light rounded-xl flex flex-row items-center gap-8 justify-between px-3 pt-3 pb-6 group"
                >
                    <div className="relative flex flex-col items-start justify-center ml-4 gap-0 z-10">
                        <p className="-rotate-1 ml-4 mb-1 text-base-content font-medium">
                            Proprietary Format
                        </p>
                        <h3 className="-rotate-1 text-2xl whitespace-nowrap font-semibold text-center px-6 py-2 bg-base-content/90 text-white rounded-full shadow-lg">
                            File Encryption & .edulock
                        </h3>
                    </div>
                    <div className="absolute right-0 bottom-0 top-0 w-3/5 h-full opacity-90 group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop"
                            alt="UX Design Workflow"
                            fill
                            className="object-cover object-center rounded-r-xl"
                        />
                    </div>
                </Link>

                {/* Card 2: Growth Tools */}
                <Link
                    href={"#"}
                    className="overflow-hidden md:hover:scale-105 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-3 transition-all duration-200 ease-in-out relative bg-hightlight-light h-[330px] rounded-xl flex flex-col items-center justify-between px-3 py-6 group"
                    style={{ backgroundColor: "var(--color-hightlight-light)" }}
                >
                    <div className="flex flex-col items-center justify-center gap-1 z-10">
                        <p className="rotate-6 mb-1 text-base-content font-medium">RAM-Only Decryption</p>
                        <h3 className="rotate-6 text-2xl font-semibold text-center px-6 py-2 bg-base-content/90 text-white rounded-full shadow-lg">
                            Secure Content Viewer
                        </h3>
                    </div>

                    <div className="absolute bottom-0 w-full h-[60%] opacity-90 group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
                            alt="Growth Analytics"
                            fill
                            className="object-cover object-center translate-y-4"
                        />
                    </div>
                </Link>

                {/* Card 3: Behavioral Principles */}
                <Link
                    href={"#"}
                    className="overflow-hidden md:hover:scale-105 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:-rotate-3 transition-all duration-200 ease-in-out relative bg-secondary-light h-[330px] rounded-xl flex flex-col items-center justify-between px-5 py-6 group"
                >
                    <div className="flex flex-col items-center justify-center gap-1 z-10">
                        <p className="-rotate-3 mb-1 text-base-content font-medium">
                            Anti-Piracy Protection
                        </p>
                        <h3 className="-rotate-3 text-2xl font-semibold text-center px-6 py-2 bg-base-content/90 text-white rounded-full shadow-lg">
                            Device Binding & Watermarking
                        </h3>
                    </div>
                    <div className="absolute bottom-0 w-full h-[60%] opacity-90 group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop"
                            alt="Behavioral Psychology"
                            fill
                            className="object-cover object-top translate-y-2 rounded-b-xl"
                        />
                    </div>
                </Link>

                {/* Card 4: Blog & Guides */}
                <Link
                    href={"#"}
                    className="pointer-events-none overflow-hidden md:hover:scale-105 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-4 transition-all duration-200 ease-in-out relative bg-base-100 h-[330px] rounded-xl flex flex-col items-center justify-center px-5 py-6 group"
                >
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Image
                            src="https://images.unsplash.com/photo-1762182403153-87466da6ce1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Blog background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="-rotate-3 mb-1 text-base-content font-medium z-10">
                        Activity Monitoring
                    </p>
                    <h3 className="-rotate-3 text-2xl font-semibold text-center px-6 py-2 bg-white/75 rounded-full z-10 backdrop-blur-sm">
                        Coming Soon
                    </h3>
                </Link>

                {/* Card 5: Playbooks */}
                <Link
                    href={"#"}
                    className="pointer-events-none overflow-hidden md:hover:scale-105 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:-rotate-6 transition-all duration-200 ease-in-out relative bg-primary-light h-[330px] rounded-xl flex flex-col items-center justify-center px-5 py-6 group"
                >
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Image
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                            alt="Playbook background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="rotate-6 mb-1 text-base-content font-medium z-10">Key Management System</p>
                    <h3 className="rotate-6 text-2xl font-semibold text-center px-6 py-2 bg-white/75 rounded-full z-10 backdrop-blur-sm">
                        Coming Soon
                    </h3>
                </Link>
            </div>
        </section>
    );
}
