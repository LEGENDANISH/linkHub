import prisma from '../config/database.js';

/**
 * @route   PUT /api/admin/plans/:id/stripe
 * @desc    Update plan with Stripe IDs (Admin only)
 * @access  Private (Admin)
 */
export const updatePlanStripeIds = async (req, res) => {
  try {
    const { id } = req.params;
    const { stripePriceId, stripeProductId } = req.body;

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        stripePriceId,
        stripeProductId
      }
    });

    res.json({
      success: true,
      message: 'Plan Stripe IDs updated successfully',
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating plan',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/admin/plans/bulk-update-stripe
 * @desc    Bulk update all plans with Stripe IDs
 * @access  Private (Admin)
 */
export const bulkUpdateStripeIds = async (req, res) => {
  try {
    const { plans } = req.body;
    // plans = [
    //   { name: 'STARTER', stripePriceId: 'price_...', stripeProductId: 'prod_...' },
    //   { name: 'PRO', stripePriceId: 'price_...', stripeProductId: 'prod_...' }
    // ]

    const updates = await Promise.all(
      plans.map(({ name, stripePriceId, stripeProductId }) =>
        prisma.plan.update({
          where: { name },
          data: { stripePriceId, stripeProductId }
        })
      )
    );

    res.json({
      success: true,
      message: 'All plans updated successfully',
      data: updates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating plans',
      error: error.message
    });
  }
};
