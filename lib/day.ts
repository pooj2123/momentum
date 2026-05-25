export const getAppDate = () => {
    const now = new Date();
  
    now.setHours(
      now.getHours() - 3
    );
  
    return now
      .toISOString()
      .split("T")[0];
  };