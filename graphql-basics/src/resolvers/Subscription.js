const Subscription = {
  count: {
    subscribe(obj, args, { pubsub }, info) {
      // Set up our subscription
      let count = 0;

      // Increment by 1 every second
      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count
        });
      }, 1000);

      // Return asyncIterator with channel name
      return pubsub.asyncIterator('count');
    }
  }
};

export { Subscription as default };
