export default function DeleteAccountPage() {
  return (
    <main className="flex flex-col gap-4">
      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      <form action="">
        <button type="submit" className="text-red-600">Delete account</button>
      </form>
    </main>
  );
}