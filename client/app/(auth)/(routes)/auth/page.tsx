import RegisterForm from "@/components/forms/auth/register-form";
import LoginForm from "@/components/forms/auth/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Auth() {
	return (
		<Tabs defaultValue="login" className="max-w-md mx-auto py-4">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Sign in</TabsTrigger>
				<TabsTrigger value="register">Sing up</TabsTrigger>
			</TabsList>

			<TabsContent value="login">
				<Card>
					<CardHeader>
						<CardTitle>Sing in</CardTitle>
						<CardDescription>Login to your existing account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<LoginForm />
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="register">
				<Card>
					<CardHeader>
						<CardTitle>Sing up</CardTitle>
						<CardDescription>
							Create free account now and join our community
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<RegisterForm />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
