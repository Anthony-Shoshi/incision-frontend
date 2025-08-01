const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Incision</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">
          Your surgical procedure cost optimization platform. Navigate using the sidebar to access different features.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--color-primary-light)] p-4 rounded-md shadow-md">
            <h3 className="font-medium text-xl font-bold mb-2">Upload Documents</h3>
            <p>Upload Excel files for cost analysis</p>
          </div>

          <div className="bg-[var(--color-primary-light)] p-4 rounded-md shadow-md">
            <h3 className="font-medium text-xl font-bold mb-2">View Procedure Results</h3>
            <p>Review detailed cost breakdown by procedure</p>
          </div>

          <div className="bg-[var(--color-primary-light)] p-4 rounded-md shadow-md">
            <h3 className="font-medium text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p>Visualize cost-saving opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
