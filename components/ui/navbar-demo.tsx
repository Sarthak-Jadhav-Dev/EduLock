import { Home, User, Shield, LogIn } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'About', url: '/about', icon: User },
        { name: 'Features', url: '/#free-tools', icon: Shield },
        { name: 'Login', url: '/login', icon: LogIn }
    ]

    return <NavBar items={navItems} />
}
