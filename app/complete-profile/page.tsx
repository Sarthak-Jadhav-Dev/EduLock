'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerWithOtp } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        registrationId: '',
        rollNo: '',
        division: '',
        department: '',
        phone: '',
    });

    // Read pending email/otp from localStorage (stored during the verify-otp call)
    const [pendingEmail, setPendingEmail] = useState('');
    const [pendingOtp, setPendingOtp] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('pendingEmail');
        const otp = localStorage.getItem('pendingOtp');
        if (!email || !otp) {
            // No pending registration — redirect back to login
            router.push('/login');
            return;
        }
        setPendingEmail(email);
        setPendingOtp(otp);
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await registerWithOtp({
                email: pendingEmail,
                otp: pendingOtp,
                name: formData.name,
                phone: formData.phone,
                role: formData.role,
                registrationId: formData.registrationId,
                rollNo: formData.rollNo || undefined,
                division: formData.division,
                department: formData.department,
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
                // Clean up pending data
                localStorage.removeItem('pendingEmail');
                localStorage.removeItem('pendingOtp');
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error('Failed to complete profile:', err);
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please provide your details to continue.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-2 rounded-md">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Input
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Select onValueChange={handleRoleChange} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Input
                                name="registrationId"
                                placeholder="Registration ID"
                                value={formData.registrationId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formData.role === 'student' && (
                            <>
                                <div>
                                    <Input
                                        name="rollNo"
                                        placeholder="Roll Number"
                                        value={formData.rollNo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <Input
                                name="division"
                                placeholder="Division"
                                value={formData.division}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                name="department"
                                placeholder="Department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Complete Profile'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
