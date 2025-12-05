using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wasp.Backend.DTOs;
using Wasp.Backend.Services;

namespace Wasp.Backend.Controllers
{
    [ApiController]
    [Route("api/accessories")]
    public class AccessoriesController : ControllerBase
    {
        private readonly IItemService _itemService;

        public AccessoriesController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ItemBaseDto>>> GetAccessories([FromQuery] ItemFilterDto filter)
        {
            filter.Type = Enums.ItemType.Accessory;
            var result = await _itemService.GetItemsAsync(filter);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AccessoryDto>> GetAccessory(Guid id)
        {
            try
            {
                var item = await _itemService.GetItemByIdAsync(id);
                if (!(item is AccessoryDto))
                    return NotFound(new { message = "Accessory not found" });

                return Ok(item as AccessoryDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Accessory not found" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<AccessoryDto>> CreateAccessory([FromBody] AccessoryDto accessoryDto)
        {
            try
            {
                var createdAccessory = await _itemService.CreateAccessoryAsync(accessoryDto);
                return CreatedAtAction(nameof(GetAccessory), new { id = createdAccessory.Id }, createdAccessory);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateAccessory(Guid id, [FromBody] AccessoryDto accessoryDto)
        {
            try
            {
                await _itemService.UpdateAccessoryAsync(id, accessoryDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Accessory not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteAccessory(Guid id)
        {
            try
            {
                var result = await _itemService.DeleteItemAsync(id);
                if (!result)
                    return NotFound(new { message = "Accessory not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
